package router

import (
	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
	"tugas/controllers"
	"tugas/middlewares"
)

func StartApp() *gin.Engine {
	r := gin.Default()
	r.Use(cors.Default())

	userRouter := r.Group("/user")
	{
		userRouter.POST("/register", controllers.UserRegister)
		userRouter.POST("/login", controllers.UserLogin)
	}

	phoneNumberRouter := r.Group("/phone")
	{
		phoneNumberRouter.POST("/create", controllers.CreatePhoneNumber, middlewares.Authentication())
		phoneNumberRouter.POST("/auto", controllers.AutoGenerateNumber, middlewares.Authentication())
		phoneNumberRouter.GET("/auto", controllers.GetPhoneNumbers)
		phoneNumberRouter.PUT("/:PhoneID", controllers.UpdateNumber)
		phoneNumberRouter.GET("/:PhoneID", controllers.GetPhoneNumberById)
		phoneNumberRouter.DELETE("/:PhoneID", controllers.DeleteNumber)
	}

	return r
}
