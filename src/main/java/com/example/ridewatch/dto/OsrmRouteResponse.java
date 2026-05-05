package com.example.ridewatch.dto;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import java.util.List;
import java.util.Map;

@JsonIgnoreProperties(ignoreUnknown = true)
public class OsrmRouteResponse {
    private String code;
    private List<RouteItem> routes;

    public OsrmRouteResponse() {
    }

    public String getCode() {
        return code;
    }

    public void setCode(String code) {
        this.code = code;
    }

    public List<RouteItem> getRoutes() {
        return routes;
    }

    public void setRoutes(List<RouteItem> routes) {
        this.routes = routes;
    }

    @JsonIgnoreProperties(ignoreUnknown = true)
    public static class RouteItem {
        private double distance;
        private double duration;
        private Map<String, Object> geometry;

        public RouteItem() {
        }

        public double getDistance() {
            return distance;
        }

        public void setDistance(double distance) {
            this.distance = distance;
        }

        public double getDuration() {
            return duration;
        }

        public void setDuration(double duration) {
            this.duration = duration;
        }

        public Map<String, Object> getGeometry() {
            return geometry;
        }

        public void setGeometry(Map<String, Object> geometry) {
            this.geometry = geometry;
        }
    }
}