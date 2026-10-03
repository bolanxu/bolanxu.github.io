---
title: "Science Olympiad Electric Vehicle"
number: "002"
description: "An autonomous electric vehicle using encoder feedback, Ackermann steering, and closed-loop control."
category: "ROBOTICS"
status: "complete"
date: 2026-01-01
featured: true
technologies: ["Arduino", "Encoders", "Ackermann", "Control"]
specs:
  Motor: "21T RC motor"
  Driver: "BTS7960"
  Feedback: "Wheel encoders"
  Steering: "Ackermann"
---

## The problem

Build a small vehicle that can repeatedly hit distance and time targets while dealing with real mechanical imperfections.

## The interesting part

The hard part was not making the wheels spin. It was making the vehicle behave consistently when the servo had slack, the battery voltage changed, and the two sides of the vehicle did not behave exactly the same.

## Control system

Encoder feedback was used for differential straight-line correction, while the steering system handled waypoint turns and a final tape-stop sequence.
