package main

import (
	"encoding/json"
	"net/http"
	"net/http/httptest"
	"testing"
)

type Color struct {
	Color     string `json:"color"`
	LightHexa string `json:"light_hexa"`
	DarkHexa  string `json:"dark_hexa"`
}

func TestMain(t *testing.T) {
	req, err := http.NewRequest("GET", "/", nil)
	if err != nil {
		t.Fatal(err)
	}

	rr := httptest.NewRecorder()
	handler := http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		green := Color{Color: "green", LightHexa: "#00AC47", DarkHexa: "#00832D"}

		w.Header().Set("Access-Control-Allow-Origin", "*")
		w.Header().Set("Content-Type", "application/json")

		json.NewEncoder(w).Encode(green)
	})

	handler.ServeHTTP(rr, req)

	if status := rr.Code; status != http.StatusOK {
		t.Errorf("handler returned wrong status code: got %v want %v",
			status, http.StatusOK)
	}
}
