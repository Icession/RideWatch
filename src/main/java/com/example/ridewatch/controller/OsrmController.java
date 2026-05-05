package com.example.ridewatch.controller;

import com.example.ridewatch.dto.OsrmRouteResponse;
import com.example.ridewatch.dto.RouteRequest;
import com.example.ridewatch.service.OsrmService;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/osrm")
@CrossOrigin(origins = "http://localhost:3000")
public class OsrmController {
    private final OsrmService osrmService;

    public OsrmController(OsrmService osrmService) {
        this.osrmService = osrmService;
    }

    @PostMapping("/route")
    public OsrmRouteResponse getRoute(@RequestBody RouteRequest request) {
        return osrmService.getRoute(request);
    }

    // @GetMapping("/test")
    // public String test() {
    //     return "OSRM controller is working";
    // }
}