package main

import (
	"encoding/json"
	"fmt"
	"net/http"
)

type Person struct {
	Name string `json:"name"`
	SSN  string `json:"ssn"`
}

func main() {
	http.HandleFunc("/", func(w http.ResponseWriter, r *http.Request) {
		people := []Person{
			{Name: "Idan Fishman", SSN: "315616615"},
			{Name: "Yosef Haim J'an", SSN: "207578717"},
			{Name: "Shay Finegold", SSN: "311165609"},
		}

		w.Header().Set("Content-Type", "application/json")
		json.NewEncoder(w).Encode(people)
	})

	fmt.Println("Listening on port 8000...")
	http.ListenAndServe(":8000", nil)
}
