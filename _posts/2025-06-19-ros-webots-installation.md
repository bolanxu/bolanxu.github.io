---
title: "How to Set Up ROS2 with Webots (For Ubuntu/Linux)"
author: Bolan Xu
date: 2025-06-19
categories: [ROS]
tags: [Tutorials]
render_with_liquid: true
---

## Install Webots

First make sure you have Webots installed.

> **Note:**
> I am using **ROS2 Foxy with Ubuntu 20.04** and the only Webots version that works with this setup is **2022b**.
> Here is a table shows how the versions matched up:
> 
> | **Webots Version** | **ROS 2 Version(s) Supported**                    | **Notes**                                                                                              |
> |--------------------|---------------------------------------------------|--------------------------------------------------------------------------------------------------------|
> | R2025a             | Jazzy Jalisco                                     | Support for Iron Irwini dropped. Also compatible with Ubuntu 24.04 and macOS 14.                       |
> | R2023b             | Iron Irwini                                       | Added support for ROS 2 Iron Irwini.                                                                   |
> | R2022a             | Foxy Fitzroy, Galactic Geochelone, Rolling Ridley | Redesigned ROS 2 interface.  New versions of the webots_ros2 package were released for these versions. |
> | R2021b             | Foxy Fitzroy, Galactic Geochelone, Rolling Ridley | Fully compatible with these versions and the rolling release.                                          |
> | R2021a             | Foxy Fitzroy                                      | Fully compatible with Foxy Fitzroy.                                                                    |
> | R2020b             | Eloquent Elusor, Foxy Fitzroy                     | Fully compatible with these two versions.                                                              |
{: .prompt-info }

Download the [.deb file](https://github.com/cyberbotics/webots/releases) of the version you want and install it with `sudo apt install ./{name of deb file}`.

## Install the webots_ros2 Package

Then install the [webots_ros2](https://github.com/cyberbotics/webots_ros2) package using the command:

`sudo apt-get install ros-foxy-webots-ros2`

Now the installation should be done!

## Test the Installation

Source the the ROS environment, and run try out an example:

`ros2 launch webots_ros2_universal_robot multirobot_launch.py`

Thats it! Now you have a fully set up ROS2 with Webots!

<!-- ![](https://github.com/bolanxu/bolanxu.github.io/blob/4186d97046a943cfb8b25bc223173e2feab69436/_posts/img/webots_install.png) -->

## References

<https://docs.ros.org/en/foxy/Tutorials/Advanced/Simulators/Webots/Installation-Ubuntu.html>
