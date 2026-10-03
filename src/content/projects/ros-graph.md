---
title: "ROS 2 Visual Graph"
number: "003"
description: "A visual development environment for mapping ROS 2 nodes, topics, services, and actions."
category: "SOFTWARE"
status: "experiment"
date: 2026-08-15
featured: true
technologies: ["Python", "Qt", "ROS 2", "Graph UI"]
specs:
  Language: "Python"
  UI: "Qt"
  Target: "ROS 2"
  Interface: "Node graph"
---

## The idea

ROS 2 systems can become difficult to understand when the interesting part of the program is spread across many files and terminals. This project explores a visual graph where nodes represent ROS nodes and connections represent the communication between them.

## Direction

The graph should eventually cover publishers, subscribers, services, actions, and the other pieces that make up a real ROS 2 system. Right-clicking a graph node should lead back to the source code it represents.
