package controllers

import (
	"fmt"
	"math/rand"
	"net/http"
	"strconv"
	"time"
	"tugas/config"
	"tugas/helpers"
	"tugas/models"

	"github.com/gin-gonic/gin"
)

func main() {
	var randomNumbers []string
	var oddNumbers []string
	var evenNumbers []string
	for i := 0; i < 25; i++ {
		phoneNumber := generateNumber()
		randomNumbers = append(randomNumbers, phoneNumber)
	}

	for _, phoneNumber := range randomNumbers {
		lastdigit := int(phoneNumber[len(phoneNumber)-1])
		if lastdigit%2 == 0 {
			evenNumbers = append(evenNumbers, phoneNumber)
		} else {
			oddNumbers = append(oddNumbers, phoneNumber)
		}
	}
	fmt.Println(evenNumbers)
	fmt.Println(oddNumbers)
}

func generateNumber() string {
	source := rand.NewSource(time.Now().UnixNano())
	r := rand.New(source)
	return fmt.Sprintf("08%010d", r.Intn(10000000000))
}

func randomProvider() string {
	source := rand.NewSource(time.Now().UnixNano())
	r := rand.New(source)
	providerArray := []string{"XL", "Telkomsel", "Indosat"}

	randomProvider := providerArray[r.Intn(len(providerArray))]
	return randomProvider
}

func AutoGenerateNumber(c *gin.Context) {
	for i := 0; i < 25; i++ {
		phoneNumber := generateNumber()
		provider := randomProvider()

		Phone := models.Phone{
			PhoneNumber: phoneNumber,
			Provider:    provider,
		}

		db := config.GetDB()
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
}

func UpdateNumber(c *gin.Context) {
	db := config.GetDB()
	contentType := helpers.GetContentType(c)
	Phone := models.Phone{}

	PhoneID, _ := strconv.Atoi(c.Param("PhoneID"))

	if contentType == appJSON {
		c.ShouldBindJSON(&Phone)
	} else {
		c.ShouldBind(&Phone)
	}

	Phone.ID = uint(PhoneID)

	err := db.Model(&Phone).Where("id = ?", PhoneID).Updates(models.Phone{
		PhoneNumber: Phone.PhoneNumber, Provider: Phone.Provider}).Error
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"error":   "Bad Request",
			"message": err.Error(),
		})
		return
	}

	c.JSON(http.StatusOK, Phone)
}

func DeleteNumber(c *gin.Context) {
	db := config.GetDB()
	contentType := helpers.GetContentType(c)
	Phone := models.Phone{}

	PhoneID, _ := strconv.Atoi(c.Param("PhoneID"))

	if contentType == appJSON {
		c.ShouldBindJSON(&Phone)
	} else {
		c.ShouldBind(&Phone)
	}

	Phone.ID = uint(PhoneID)

	err := db.Model(&Phone).Where("id = ?", PhoneID).Delete(&Phone).Error
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"error":   "Bad Request",
			"message": err.Error(),
		})
		return
	}
	c.JSON(http.StatusOK, gin.H{
		"message": "Phon number deleted",
	})
}

func GetPhoneNumbers(c *gin.Context) {
	db := config.GetDB()
	contentType := helpers.GetContentType(c)
	Phones := []models.Phone{}

	var ganjil []models.Phone
	var genap []models.Phone

	if contentType == appJSON {
		c.ShouldBindJSON(&Phones)
	} else {
		c.ShouldBind(&Phones)
	}

	err := db.Debug().Find(&Phones).Error

	for _, phone := range Phones {

		number, err := strconv.Atoi(phone.PhoneNumber)
		fmt.Println(number)
		if err != nil {

			c.JSON(http.StatusInternalServerError, gin.H{
				"error":   "Bad Request",
				"message": err.Error(),
			})
			return
		}

		if number%2 == 0 {
			genap = append(genap, phone)
		} else {
			ganjil = append(ganjil, phone)
		}
	}

	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"error":   "Bad Request",
			"message": err.Error(),
		})
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"message":      "successfully getting the data...",
		"ganjil":       ganjil,
		"genap":        genap,
		"phoneNumbers": Phones,
	})
}

func GetPhoneNumberById(c *gin.Context) {
	db := config.GetDB()
	contentType := helpers.GetContentType(c)
	Phone := models.Phone{}

	PhoneID, _ := strconv.Atoi(c.Param("PhoneID"))

	if contentType == appJSON {
		c.ShouldBindJSON(&Phone)
	} else {
		c.ShouldBind(&Phone)
	}

	Phone.ID = uint(PhoneID)

	err := db.Model(&Phone).Where("id = ?", PhoneID).Find(&Phone).Error
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"error":   "Bad Request",
			"message": err.Error(),
		})
		return
	}
	c.JSON(http.StatusOK, gin.H{
		"message": "Getting phone number...",
		"data":    Phone,
	})
}
