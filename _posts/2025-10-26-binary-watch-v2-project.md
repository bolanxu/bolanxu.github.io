---
title: "My Binary Watch Project (V2)"
date: 2025-10-26
categories: [Projects]
tags: [embedded, watch, 8051]
image: /assets/images/binary-watch-pcb.png
---

<iframe width="560" height="315" src="https://www.youtube.com/embed/BXuusliDPBQ?si=oaJnJE6nZfpPP-23" 
  title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
  referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>

<https://github.com/bolanxu/binary_watch>

## Intro

Hello and welcome to my blog! This post is about a project that I completed a few months ago: the Binary Watch V2. The concept of a binary watch isn't entirely new, but I wanted to make my own version, and I’m excited to share it with you.
In the video above, I go into detail about how I built this watch, but I thought it would be helpful to include some additional insights here that didn’t make it into the video. 
This project was relatively simple in terms of its core functionality, but I’m really happy with how the final product turned out, as you can see in the thumbnail.
This is actually the second version of the watch. I had built a first version earlier, but it had significant issues with time accuracy due to the lack of a real-time clock (RTC) module. 
The first version was good for experimentation, but it was too inaccurate to be practical for everyday use. This second version solves that problem with a more precise RTC, making it a much more reliable timepiece.

Before diving into the technical details, let’s talk a little about the idea behind a binary watch. The basic principle is simple: instead of the traditional analog or digital display, the time is shown using binary numbers. 
For example, the hour is displayed as a series of 6 LEDs, each corresponding to a power of 2.
You might be wondering: why binary? For one, it’s a fun way to combine technology and traditional timekeeping. 
It also offers a unique challenge for me as a hobbyist embedded systems developer—creating a device that combines a simple concept with a few technical challenges. Plus, I think it looks cool!

## Programming Part of it

The heart of the binary watch is the STC15W204S microcontroller, which is a relatively obscure chip from a Chinese company, based on the [Intel 8051](https://en.wikipedia.org/wiki/Intel_MCS-51). 
The choice of this microcontroller was partly due to availability, cost, and the fact that it has enough features to get the job done.
Despite being a basic-level MCU, it is well-suited for this project and consumes very little power, which is critical for battery-operated devices like this.
The code was written in C using the SDCC (Small Device C Compiler), and the main program file, [main.c](https://github.com/bolanxu/binary_watch/blob/main/src/main.c) contains just only over 200 lines of code. 
Most of the logic revolves around calculating the binary time representation and managing the interaction with the real-time clock (RTC) module.

The most challenging part of writing the code was interfacing with the DS1302 RTC module. This module communicates over the SPI protocol, but since the STC15W204S doesn’t have hardware SPI support, I had to implement a software-based version of SPI. 
This was tricky, but with some careful timing and bit-banging (and inline Assembly 😬), I was able to get it working reliably.
To keep the code compact and efficient, I broke it into small functions for reading the RTC, updating the LEDs, and handling button presses (for setting the time). 
The LEDs are used to show the hours, minutes, and seconds in binary form, which is a pretty neat challenge in itself.

## Hardware Side

![](https://raw.githubusercontent.com/bolanxu/binary_watch/deef5991fe152f8641dbee8f135e3da30145ae9f/docs/binary-watch-pcb.png)

<img width="2000" height="1414" alt="image" src="https://github.com/user-attachments/assets/4ae82dd2-b8ff-4cab-89b1-e8b1bae8291a" />

The hardware design of the binary watch is straightforward but effective. The PCB (Printed Circuit Board) and schematic designs were created using EasyEDA, which I found to be a great alternative to more complex and expensive tools like EAGLE. 
EasyEDA is user-friendly, and its online platform makes it easier.

Components Used:

* STC15W204S Microcontroller: This microcontroller controls everything, gets time, button inputs, and LED control.
* DS1302 RTC Module: This module keeps the time accurate, running independently from the microcontroller.
* 6 LEDs: These display the time in binary format, with each LED representing a power of 2.
* 2 Push Buttons: These allow the user to adjust the time settings and read the watch.
* Some Resistors: Protect LEDs.
* Crystal Oscillator: To keep the time with DS1302.

The circuit itself is very simple, a minimal microcontroller circuit with just the necessary components: two buttons for user input and six LEDs for displaying the binary time. 
I opted for a simple, compact design to keep the build small and efficient, and I think it turned out quite well.

The layout of the PCB was designed to fit into a small, 3D-printed portable casing that can be worn on the wrist.

## Some Challenges

Every project comes with its own set of challenges, and this one was no exception. Here are a few key hurdles I faced:

* Accuracy Issues: The lack of a good RTC in the first version made the timekeeping unreliable. The DS1302 in this version resolved that issue, but I still had to deal with occasional drift.
* Software SPI: As mentioned earlier, implementing the software SPI to communicate with the DS1302 was tricky. Timing was crucial, and I had to carefully optimize the code to avoid errors.
* Power Consumption: Keeping the power consumption low was important to make sure the watch could last a reasonable amount of time on a small battery. I had to optimize the code and hardware to minimize idle current draw.

Despite these challenges, I’m pleased with how it turned out. The watch is functional, accurate, and unique, which was exactly what I was aiming for.

## Next Steps & Future Improvements

While this project is complete, I’m always thinking about ways to improve it. Some ideas for future versions of the watch include:

* Adding More Features: It would be cool to add an alarm function or some kind of vibration notification.
* Smaller Form Factor: Although this version is quite compact, I think it would be fun to try and make it even smaller, it feels a little too tall right now.
* Changing LED layout: I seen some other binary clocks that utilized a [BCD-display format](https://www.exploringbinary.com/how-to-read-a-binary-clock/) that I could maybe adopt.

## Conclusion

I’m really happy with how the Binary Watch V2 turned out. It was a fun project that allowed me to practice my skills with embedded systems, programming, and hardware design. 
Plus, it’s always nice to have a cool gadget that you can wear on your wrist and show off to friends.

If you're interested in the details of the project, including the source code and design files, feel free to check out the [GitHub repository](https://github.com/bolanxu/binary_watch). 
I hope this project inspires you to take on your own embedded systems challenge, or maybe even build your own binary watch!

Thanks for reading, and stay tuned for more projects!
