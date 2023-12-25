package router

import (
	"github.com/gin-gonic/gin"
	"net/http"
	"tugas/controllers"
)

func StartApp() *gin.Engine {
	r := gin.Default()

	r.LoadHTMLGlob("templates/*")
	r.GET("/", func(c *gin.Context) {
		c.HTML(http.StatusOK, "index.html", gin.H{})
	})

	phoneNumberRouter := r.Group("/phone")
	{
		phoneNumberRouter.POST("/create", controllers.CreatePhoneNumber)
		phoneNumberRouter.POST("/auto", controllers.AutoGenerateNumber)
		phoneNumberRouter.GET("/auto", controllers.GetPhoneNumbers)
		phoneNumberRouter.PUT("/:PhoneID", controllers.UpdateNumber)
		phoneNumberRouter.DELETE("/:PhoneID", controllers.DeleteNumber)
	}

	return r
}
