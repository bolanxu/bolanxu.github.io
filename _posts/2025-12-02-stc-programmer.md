---
layout: post
title: "Auto STC Programmer"
date: 2025-12-23
categories: [Projects]
tags: [c51, programmer, ch340, uart, stcgal, tools]
image: /assets/images/IMG_0110.JPG
# pin: true
# mermaid: true
---

I built a small, reliable USB programmer for STC microcontrollers such as the `STC89C52`, centered on the `CH340N` USB–UART bridge. There are many USB-TTL devices out there but this one is a little bit more special: automatic power cycling. Normally when flashing a STC microntroller you have to manually toggle the boards power, however this automates that process. A two-transistor circuit watches the `RTS` line and briefly toggles the target’s 5 V rail whenever a flashing session starts. That short off/on pulse is exactly what STC parts expect before they enter their download protocol, so flashing becomes a single command instead of having to unplug and replug power.

## The Two-Transistor Switch

The circuit is simple. The `CH340N` has an `RTS`, and that single handshake line drives a two-transistor stage that cleanly switches the target’s 5 V. The first transistor is for the first stage small level-control for the microntroller effectively pulsing the second transistor which acts kind of like a power switch transistor. The source of the pulsing comes from the capacitor which gives a quick on/off pulse to the base of the first transistor. For the second transistor, I did experiment with using an NPN, but I found out one problem: it did not share common ground with the microntoller circuit. So instead I used for a PNP transitor which effectively solved my problem.

During development I simulated the behavior and verified that `RTS` transitions produced a crisp, short outage on VCC followed by a stable restore. That’s all the MCU needs to start listening for the downloader.

Here's the link to the simulation of the transistor part of the circuit using Falstad Circuit Simulator:

<https://tinyurl.com/circuit-link>

Here’s the simulated circuit showing the two-transistor switch, sense resistor, and voltmeter traces during the power pulse.

![STC Programmer Circuit (CH340N)](/assets/images/screenshot-programmer-circuit.png)

And here is a screenshot of the full schematic:
![](/assets/images/SCH_Schematic1_1-P1_2025-12-23.png)


## Wiring It Up

Hookup is straightforward:
- `TXD` of CH340N → `RXD` of MCU
- `RXD` of CH340N → `TXD` of MCU
- Shared `GND` between programmer and target
- `VCC` to the target passes through the two-transistor switch, which is controlled by `RTS`

## Flashing, Bare Metal

I use `stcgal`, which uses the STC serial protocol and can control `RTS`, so it naturally drives the power-cycle. When `stcgal` triggers `RTS`, the circuit interrupts power for a moment. As the rail comes back up, the MCU enters the download mode and the tool streams the firmware.

Example command:

```bash
stcgal code.ihx
```

## Build

I made the circuit on a protoype board and I also designed a small enclosure to prevent possible short circuits. It was not the best soldering job but it worked.

![](/assets/images/IMG_0112.JPG)

![](/assets/images/IMG_0113.JPG)

![](/assets/images/IMG_0114.JPG)

## Closing Thoughts

With the power-cycle automated, `stcgal` does the rest, and you can stay focused on firmware rather than fiddling with cables.
