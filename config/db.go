package config

import (
	"fmt"
	"gorm.io/driver/postgres"
	"gorm.io/gorm"
	"log"
	"tugas/models"
)

var (
	db  *gorm.DB
	err error
)

func StartDB() {
	var (
		host     = "localhost"
		user     = "postgres"
		password = "postgres"
		dbport   = "5432"
		dbname   = "phone_number"
	)
	config := fmt.Sprintf("host=%s user=%s password=%s dbname=%s port=%s sslmode=disable", host, user, password, dbname, dbport)
	dsn := config
	db, err = gorm.Open(postgres.Open(dsn), &gorm.Config{})

	if err != nil {
		log.Fatal("error connecting to database :", err)
	}

	fmt.Println("sukses koneksi ke database")
	db.Debug().AutoMigrate(models.Phone{}, models.User{})
}

func GetDB() *gorm.DB {
	return db
}
