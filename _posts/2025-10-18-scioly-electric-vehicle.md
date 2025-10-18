---
title: "Starting My Science Olympiad Electric Vehicle"
author: Bolan Xu
date: 2025-10-18
categories: [Science Olympiad]
tags: [Projects]
render_with_liquid: true
---

## Introduction to Project

I've been a little busy recently and haven't had time to post on my blog. Recently I've been working on making a electric vehicle (EV) for the Science Olympiad Competition. You can learn more about the competition and this specific event here:

https://www.soinc.org/
https://www.soinc.org/electric-vehicle-c

In the EV event, teams design, build, and test one vehicle that uses electrical energy as its sole means of propulsion to travel as quickly as possible and stop close to a Target Point (from official website).
Last year my team did not do very well and placed 6th in the regional competition and this year we are looking to win! So here is what I have done so far.

## CAD Design
Before I buy any parts, I usually like to model out my entire robot in CAD software. Here is the link to my Onshape Project:

https://cad.onshape.com/documents/29281ce2187f9254c6e2e702/w/352244fd2678fb6f479b07da/e/51d2caeb455e393a1e6f87ce?renderMode=0&uiState=68f4193717e7b419ade04806

![](https://raw.githubusercontent.com/bolanxu/bolanxu.github.io/refs/heads/main/assets/images/ev_onshape_10_18_2025.png)

## Design Technical Parts

My basic design is based mainly off of this one here:

https://unphayzed.com/kit-instructions/ev26/

But I am looking to change a few aspects of this design:

 - I am looking to redesign the steering part of the vehicle with the caliper in the Unphayzed design with a motorized turning mechanism that I hope will allow the EV to achieve greater accuracy during turns.
 - The odometry design of the Unphayzed EV includes a single encoder connected to the front axle. However, with my idea for motorized steering,
   it would necessary for the odometry system measure not only the distance the EV has gone, but also the horizontal movement side to side to measure how much the EV has turned.
   Because of this, I have come up with two designs right now. One is to remove the axle connecting the two front wheels and connect two encoders, one to each wheel to measure the turn of the EV.
   Another option, which I find creative but risky would be to utilize a odometry system with two computer mice.
 
### Mouse Odometry
This idea was largely inspired by this paper and tutorial:

https://www.researchgate.net/publication/221645389_Dead_Reckoning_for_Mobile_Robots_Using_Two_Optical_Mice
https://www.instructables.com/Optical-Mouse-Odometer-for-Arduino-Robot/

The idea is to take two computer mice and place them on both sides of the robot. Similar to how you would use a mouse for a computer, the mice would detect the movement of the floor relative to the robot in two dimensions.
This would allow the robot to find exactly where the robot would be at any given moment. However there are some challenges that I forsee. One being that the mouse could fail to register the movement becuase of the possibly
reflective surface of the competition gym floor. Additionally I am not sure if the mouse would be able to be accurate and fast enough for EV.

## Conclusion
Ok this is what I have so for my design, I will continue working on my design and post updates here.
