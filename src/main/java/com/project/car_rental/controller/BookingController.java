package com.project.car_rental.controller;

import com.project.car_rental.entity.Booking;
import com.project.car_rental.service.BookingService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/bookings")

public class BookingController {

    @Autowired
    private BookingService bookingService;

    // User books a car
    @PostMapping("/book")
    public ResponseEntity<Booking> bookCar(@RequestBody Booking booking) {
        Booking savedBooking = bookingService.save(booking);
        return ResponseEntity.ok(savedBooking);
    }

    // Get all bookings (for admin view)
    @GetMapping
    public List<Booking> getAllBookings() {
        return bookingService.getAllBookings();
    }

    // Get bookings by user email
    @GetMapping("/user/{email}")
    public List<Booking> getUserBookings(@PathVariable String email) {
        return bookingService.getBookingsByUserEmail(email);
    }

    // Cancel booking
    @DeleteMapping("/{id}")
    public ResponseEntity<String> cancelBooking(@PathVariable Long id) {
        boolean deleted = bookingService.deleteBooking(id);
        if (deleted) return ResponseEntity.ok("Booking cancelled");
        else return ResponseEntity.status(404).body("Booking not found");
    }
}
