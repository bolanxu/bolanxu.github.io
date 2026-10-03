---
title: "Terminus"
number: "001"
description: "A terminal-style cellular phone built from scratch for communication without the smartphone ecosystem."
category: "HARDWARE"
status: "active"
date: 2026-01-20
updated: 2026-10-02
featured: true
technologies: ["ESP8266", "LTE", "C++", "PCB Design"]
specs:
  MCU: "ESP8266"
  Display: "1.8 in TFT"
  Input: "Physical keyboard"
  Connectivity: "Cellular"
---

## The problem

I wanted a phone that could communicate with normal phones without turning into a tiny smartphone. No touchscreen, app store, social feed, or endless notifications. Just communication and a terminal-like interface.

## The idea

Terminus treats the cellular connection as a **network interface** rather than the center of an app ecosystem. The hardware is deliberately physical: a small display, real keys, and a board designed around the way I actually want to use it.

## Constraints

- No touchscreen
- Physical input
- Text-first interface
- Normal cellular communication
- Small enough to actually carry

## Building it

The prototype combines an ESP8266, a small color TFT, a physical key matrix, and cellular hardware. The enclosure and PCB are being developed alongside the firmware rather than treated as separate projects.

## What is next

The project is still active. The next revisions are focused on making the hardware more comfortable to use, tightening the enclosure, and turning the prototype interface into something that feels like a real device.
