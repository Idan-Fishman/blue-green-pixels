package main

import (
	"encoding/json"
	"fmt"
	"net/http"
)

type Color struct {
	Color     string `json:"color"`
	LightHexa string `json:"light_hexa"`
	DarkHexa  string `json:"dark_hexa"`
}

func main() {
	http.HandleFunc("/", func(w http.ResponseWriter, r *http.Request) {
		blue := Color{Color: "blue", LightHexa: "#2684FC", DarkHexa: "#0066DA"}

		w.Header().Set("Access-Control-Allow-Origin", "*")
		w.Header().Set("Content-Type", "application/json")

		json.NewEncoder(w).Encode(blue)
	})

	fmt.Println("Listening on port 8000...")
	http.ListenAndServe(":8000", nil)
}
