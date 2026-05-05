package com.example.ridewatch.dto;

public class RouteRequest {
    private CoordinateRequest origin;
    private CoordinateRequest destination;

    public RouteRequest() {
    }

    public CoordinateRequest getOrigin() {
        return origin;
    }

    public void setOrigin(CoordinateRequest origin) {
        this.origin = origin;
    }

    public CoordinateRequest getDestination() {
        return destination;
    }

    public void setDestination(CoordinateRequest destination) {
        this.destination = destination;
    }
}