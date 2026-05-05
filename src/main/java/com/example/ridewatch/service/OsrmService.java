package com.example.ridewatch.service;

import com.example.ridewatch.dto.CoordinateRequest;
import com.example.ridewatch.dto.OsrmRouteResponse;
import com.example.ridewatch.dto.RouteRequest;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.util.UriComponentsBuilder;

@Service
public class OsrmService {
    private final RestTemplate restTemplate;

    @Value("${osrm.base-url:http://localhost:5000}")
    private String osrmBaseUrl;

    public OsrmService(RestTemplate restTemplate) {
        this.restTemplate = restTemplate;
    }

    @SuppressWarnings("deprecation")
    public OsrmRouteResponse getRoute(RouteRequest request) {
        validateRouteRequest(request);

        CoordinateRequest origin = request.getOrigin();
        CoordinateRequest destination = request.getDestination();

        String coordinates = origin.getLongitude() + "," + origin.getLatitude() + ";"
                + destination.getLongitude() + "," + destination.getLatitude();

        String url = UriComponentsBuilder
                .fromHttpUrl(osrmBaseUrl + "/route/v1/driving/" + coordinates)
                .queryParam("overview", "full")
                .queryParam("geometries", "geojson")
                .queryParam("steps", "true")
                .toUriString();

        OsrmRouteResponse response = restTemplate.getForObject(url, OsrmRouteResponse.class);

        if (response == null) {
            throw new RuntimeException("No response received from OSRM.");
        }

        return response;
    }

    private void validateRouteRequest(RouteRequest request) {
        if (request == null || request.getOrigin() == null || request.getDestination() == null) {
            throw new IllegalArgumentException("Origin and destination are required.");
        }
    }
}