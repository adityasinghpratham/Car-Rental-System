package com.project.car_rental.service;

import com.project.car_rental.entity.Booking;
import com.project.car_rental.repository.BookingRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
public class BookingService {

    @Autowired
    private BookingRepository bookingRepository;

    public Booking save(Booking booking) {
        booking.setStartDate(LocalDate.now());
        booking.setStatus("BOOKED");
        return bookingRepository.save(booking);
    }

    public List<Booking> getAllBookings() {
        return bookingRepository.findAll();
    }

    public List<Booking> getBookingsByUserEmail(String email) {
        return bookingRepository.findAll().stream()
                .filter(b -> b.getUser().getEmail().equalsIgnoreCase(email))
                .toList();
    }

    public boolean deleteBooking(Long id) {
        Optional<Booking> booking = bookingRepository.findById(id);
        if (booking.isPresent()) {
            bookingRepository.deleteById(id);

            return true;
        }
        return false;
    }
}
