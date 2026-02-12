package com.project.car_rental.controller;

import com.project.car_rental.entity.Booking;
import com.project.car_rental.entity.Car;
import com.project.car_rental.entity.User;
import com.project.car_rental.service.BookingService;
import com.project.car_rental.service.CarService;
import com.project.car_rental.service.CustomUserDetailsService;
import com.project.car_rental.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.Base64;
import java.util.List;

@RestController
@RequestMapping("/api/cars")
@CrossOrigin(origins = "http://localhost:3000")
public class CarController {

    @Autowired
    private CarService carService;
    @Autowired
    private UserService userService;
    @Autowired
    private BookingService bookingService;
    private final String UPLOAD_DIR = "uploads/";
    @PreAuthorize("hasRole('ADMIN')")
    @PostMapping("/add")
    public ResponseEntity<Car> addCar(
            @RequestParam("name") String name,
            @RequestParam("description") String description,
            @RequestParam("price") Double price,
            @RequestParam(value = "image", required = false) MultipartFile image) {

        Car car = new Car();
        car.setName(name);
        car.setDescription(description);
        car.setPrice(price);

        if (image != null && !image.isEmpty()) {
            try {
                String mimeType = image.getContentType(); // image/jpeg or image/png
                String base64 = Base64.getEncoder().encodeToString(image.getBytes());
                car.setImageUrl("data:" + mimeType + ";base64," + base64);
            } catch (IOException e) {
                e.printStackTrace();
            }
        }

        return ResponseEntity.ok(carService.saveCar(car));
    }

//    @PostMapping("/add")
//    public ResponseEntity<Car> addCar(
//            @RequestPart("car") Car car,
//            @RequestPart(value = "image", required = false) MultipartFile image
//    ) throws IOException {
//        if (!image.isEmpty()) {

//            String fileName = System.currentTimeMillis() + "_" + image.getOriginalFilename();
//            Path path = Paths.get(UPLOAD_DIR);
//            if (!Files.exists(path)) Files.createDirectories(path);
//
//            Files.copy(image.getInputStream(), path.resolve(fileName), StandardCopyOption.REPLACE_EXISTING);
//            car.setImageUrl("/api/cars/images/" + fileName); // store URL for frontend
//            try {
//                // convert bytes to Base64 string
//                String base64Image = Base64.getEncoder().encodeToString(image.getBytes());
//                car.setImageUrl(base64Image);
//            } catch (IOException e) {
//                e.printStackTrace();
//            }
//        }
//
//        return ResponseEntity.ok(carService.saveCar(car));
//    }
    @PreAuthorize("hasRole('ADMIN')")
    @PutMapping("/{id}")
    public ResponseEntity<Car> updateCar(
            @PathVariable Long id,
            @RequestParam("name") String name,
            @RequestParam("description") String description,
            @RequestParam("price") Double price,
            @RequestParam(value = "image", required = false) MultipartFile image) {

        Car car = carService.getCarById(id);
        if (car == null) return ResponseEntity.notFound().build();

        car.setName(name);
        car.setDescription(description);
        car.setPrice(price);

        if (image != null && !image.isEmpty()) {
            try {
                String mimeType = image.getContentType();
                String base64 = Base64.getEncoder().encodeToString(image.getBytes());
                car.setImageUrl("data:" + mimeType + ";base64," + base64);
            } catch (IOException e) {
                e.printStackTrace();
            }
        }

        return ResponseEntity.ok(carService.saveCar(car));
    }


    @GetMapping
    public ResponseEntity<List<Car>> getAllCars() {
        List<Car> cars = carService.getAllCars();

//        cars.forEach(car -> {
//            if (car.getImageUrl() != null) {
//                car.setImageUrl("http://localhost:8080/api/cars/images/" + car.getImageUrl());
//            }
//        });

        return ResponseEntity.ok(cars);
    }
    @PreAuthorize("hasRole('ADMIN')")
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteCar(@PathVariable Long id){
        carService.deleteCar(id);
        return ResponseEntity.noContent().build();
    }
    @PostMapping("/book/{carId}")
    public ResponseEntity<?> bookCar(
            @PathVariable Long carId,
            @AuthenticationPrincipal org.springframework.security.core.userdetails.User principal
    ) {
        Car car = carService.getCarById(carId);
        if (car == null) return ResponseEntity.notFound().build();

        User user = userService.getByEmail(principal.getUsername());
        if (user == null) return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();

        Booking booking = new Booking();
        booking.setCar(car);
        booking.setUser(user);

        bookingService.save(booking);

        return ResponseEntity.ok("Car booked successfully for " + user.getEmail());
    }


}
