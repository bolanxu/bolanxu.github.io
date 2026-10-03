---
title: "The Vehicle Wasn't Turning"
description: "A short debugging log about steering commands that looked correct in code but did not move the hardware."
date: 2026-09-01
tags: ["Robotics", "Debugging", "Science Olympiad"]
project: "electric-vehicle"
---

## The symptom

The software was calculating a steering offset. The numbers looked reasonable. But at a critical point in the run, the servo barely moved.

## The rabbit hole

When code says one thing and hardware does another, there are a lot of suspects: timing, power, mechanical slack, signal generation, and the servo itself.

The useful lesson was that a correct variable value is not proof that the physical system received or acted on it.

## The lesson

Debugging a robot means following the signal all the way from the algorithm to the mechanism. The bug does not care which layer you thought was working.
