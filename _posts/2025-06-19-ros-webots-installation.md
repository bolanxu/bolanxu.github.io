---
layout: post
title: "How to set up ROS2 Robot Simulation with Webots (Installation and Testing)"
categories: ROS
---

# How to Set Up Webots for ROS2 #

## First the Installation ##

Based from this link:

[Webot Installation](https://docs.ros.org/en/foxy/Tutorials/Advanced/Simulators/Webots/Installation-Ubuntu.html)

First make sure you have Webots installed.

> **Note:**
> I am using **ROS2 Foxy with Ubuntu 20.04** and the only Webots
> version that works with this setup is **2022b**.
>
> You have to check which version of Webots works with your installation.

[Link to 2022b version](https://github.com/cyberbotics/webots/releases/tag/R2022b)

And the [Release Page](https://github.com/cyberbotics/webots/releases)

Then install the [webots_ros2](https://github.com/cyberbotics/webots_ros2) package using the command:

`sudo apt-get install ros-foxy-webots-ros2`

Now the installation should be done!

Source the the ROS environment, and run an example:

`ros2 launch webots_ros2_universal_robot multirobot_launch.py`

## Set up a Basic Robot Simulation ##

 Change the current directory of your terminal to `ros2_ws/src` and run:

`ros2 pkg create --build-type ament_python --node-name my_robot_driver webot_test --dependencies rclpy geometry_msgs webots_ros2_driver`

Then add the neccessary folders in the package:

```
cd webot_test
mkdir launch
mkdir worlds
```

Then [download this world file](https://docs.ros.org/en/foxy/_downloads/5ad123fc6a8f1ea79553d5039728084a/my_world.wbt) and move it into the worlds folder of the package.

Next we to have to edit the `my_robot_driver.py` file:

```python
import rclpy
from geometry_msgs.msg import Twist

HALF_DISTANCE_BETWEEN_WHEELS = 0.045
WHEEL_RADIUS = 0.025

class MyRobotDriver:
    def init(self, webots_node, properties):
        self.__robot = webots_node.robot

        self.__left_motor = self.__robot.getDevice('left wheel motor')
        self.__right_motor = self.__robot.getDevice('right wheel motor')

        self.__left_motor.setPosition(float('inf'))
        self.__left_motor.setVelocity(0)

        self.__right_motor.setPosition(float('inf'))
        self.__right_motor.setVelocity(0)

        self.__target_twist = Twist()

        rclpy.init(args=None)
        self.__node = rclpy.create_node('my_robot_driver')
        self.__node.create_subscription(Twist, 'cmd_vel', self.__cmd_vel_callback, 1)

    def __cmd_vel_callback(self, twist):
        self.__target_twist = twist

    def step(self):
        rclpy.spin_once(self.__node, timeout_sec=0)

        forward_speed = self.__target_twist.linear.x
        angular_speed = self.__target_twist.angular.z

        command_motor_left = (forward_speed - angular_speed * HALF_DISTANCE_BETWEEN_WHEELS) / WHEEL_RADIUS
        command_motor_right = (forward_speed + angular_speed * HALF_DISTANCE_BETWEEN_WHEELS) / WHEEL_RADIUS

        self.__left_motor.setVelocity(command_motor_left)
        self.__right_motor.setVelocity(command_motor_right)
```

With the plugin finished, we need create the URDF file for the robot.
In the `resource` folder create a file named `my_robot.urdf` with this:

```xml
<?xml version="1.0" ?>
<robot name="My robot">
    <webots>
        <plugin type="webot_test.my_robot_driver.MyRobotDriver" />
    </webots>
</robot>
```

Then we need to create the launch file in the launch folder of the package named `robot_launch.py` with:

```python
import os
import pathlib
import launch
from launch_ros.actions import Node
from launch import LaunchDescription
from ament_index_python.packages import get_package_share_directory
from webots_ros2_driver.webots_launcher import WebotsLauncher
from webots_ros2_driver.utils import controller_url_prefix


def generate_launch_description():
    package_dir = get_package_share_directory('webot_test')
    robot_description = pathlib.Path(os.path.join(package_dir, 'resource', 'my_robot.urdf')).read_text()

    webots = WebotsLauncher(
        world=os.path.join(package_dir, 'worlds', 'my_world.wbt')
    )

    my_robot_driver = Node(
        package='webots_ros2_driver',
        executable='driver',
        output='screen',
        additional_env={'WEBOTS_CONTROLLER_URL': controller_url_prefix() + 'my_robot'},
        parameters=[
            {'robot_description': robot_description},
        ]
    )

    return LaunchDescription([
        webots,
        my_robot_driver,
        launch.actions.RegisterEventHandler(
            event_handler=launch.event_handlers.OnProcessExit(
                target_action=webots,
                on_exit=[launch.actions.EmitEvent(event=launch.events.Shutdown())],
            )
        )
    ])
```

And finally we need to modify the `setup.py` file to add the extra files we added.
Replace its contents with:

```python
from setuptools import setup

package_name = 'webot_test'
data_files = []
data_files.append(('share/ament_index/resource_index/packages', ['resource/' + package_name]))
data_files.append(('share/' + package_name + '/launch', ['launch/robot_launch.py']))
data_files.append(('share/' + package_name + '/worlds', ['worlds/my_world.wbt']))
data_files.append(('share/' + package_name + '/resource', ['resource/my_robot.urdf']))
data_files.append(('share/' + package_name, ['package.xml']))

setup(
    name=package_name,
    version='0.0.0',
    packages=[package_name],
    data_files=data_files,
    install_requires=['setuptools'],
    zip_safe=True,
    maintainer='user',
    maintainer_email='user.name@mail.com',
    description='TODO: Package description',
    license='TODO: License declaration',
    tests_require=['pytest'],
    entry_points={
        'console_scripts': [
            'my_robot_driver = webot_test.my_robot_driver:main',
        ],
    },
)
```

Ok now its time to test it:

```
cd ~/ros2_ws
colcon build
source install/local_setup.bash
ros2 launch webot_test robot_launch.py
```

It should look something like this:

![](~/Pictures/webots_test_screenshot.png)

In another terminal running this command should move the robot forward:

`ros2 topic pub /cmd_vel geometry_msgs/Twist  "linear: { x: 0.1 }"`

Thats it! Now you have a fully set up robot simulation with ROS2 and Webots!
