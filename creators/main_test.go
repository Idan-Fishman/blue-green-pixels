package main

import (
	"encoding/json"
	"net/http"
	"net/http/httptest"
	"testing"
)

type Person struct {
	Name string `json:"name"`
	SSN  string `json:"ssn"`
}

func TestMain(t *testing.T) {
	req, err := http.NewRequest("GET", "/", nil)
	if err != nil {
		t.Fatal(err)
	}

	rr := httptest.NewRecorder()
	handler := http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		people := []Person{
			{Name: "Idan Fishman", SSN: "315616615"},
			{Name: "Yosef Haim J'an", SSN: "207578717"},
			{Name: "Shay Finegold", SSN: "311165609"},
		}

		w.Header().Set("Access-Control-Allow-Origin", "*")
		w.Header().Set("Content-Type", "application/json")

		json.NewEncoder(w).Encode(people)
	})

	handler.ServeHTTP(rr, req)

	if status := rr.Code; status != http.StatusOK {
		t.Errorf("handler returned wrong status code: got %v want %v",
			status, http.StatusOK)
	}
}
