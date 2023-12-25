package main

import (
	"log"
	"tugas/config"
	"tugas/router"
)

func main() {
	config.StartDB()
	r := router.StartApp()
	log.Println("starting app...")
	r.Run(":5000")
}
