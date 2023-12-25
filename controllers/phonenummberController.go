package controllers

import (
	"net/http"
	"tugas/config"
	"tugas/helpers"
	"tugas/models"

	"github.com/gin-gonic/gin"
)

var appJSON = "application/`json"

type PhoneNumber struct {
	PhoneNumber string `json:"PhoneNumber"`
	Provider    string `json:"Provider"`
}

func CreatePhoneNumber(c *gin.Context) {
	db := config.GetDB()
	contentType := helpers.GetContentType(c)
	req := PhoneNumber{}

	if contentType == appJSON {
		c.ShouldBindJSON(&req)
	} else {
		c.ShouldBind(&req)
	}
	Phone := models.Phone{
		PhoneNumber: req.PhoneNumber,
		Provider:    req.Provider,
	}

	err := db.Debug().Create(&Phone).Error
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"error":   "Bad Request",
			"message": err.Error(),
		})
		return
	}
	c.JSON(http.StatusCreated, gin.H{
		"message": "Created successfully",
		"data":    Phone,
	})
}
