package main

import (
	"fmt"
	"math/rand"
	"time"

	"github.com/go-playground/validator/v10"
	"github.com/goccy/go-json"
	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/fiber/v2/middleware/favicon"
	"github.com/gofiber/fiber/v2/middleware/logger"
	"github.com/spf13/viper"
	"gorm.io/driver/postgres"
	"gorm.io/gorm"
)

type Config struct {
	PostgresHost     string `validate:"required"`
	PostgresPort     int    `validate:"required"`
	PostgresUser     string `validate:"required"`
	PostgresPassword string `validate:"required"`
	PostgresDatabase string `validate:"required"`
}

type Rollout struct {
	gorm.Model
	Status int `json:"status"`
}

func loadConfig() {
	viper.AutomaticEnv()

	options = Config{
		PostgresHost:     viper.GetString("POSTGRES_HOST"),
		PostgresPort:     viper.GetInt("POSTGRES_PORT"),
		PostgresUser:     viper.GetString("POSTGRES_USER"),
		PostgresPassword: viper.GetString("POSTGRES_PASSWORD"),
		PostgresDatabase: viper.GetString("POSTGRES_DATABASE"),
	}

	err := validate.Struct(options)
	if err != nil {
		panic(err)
	}
}

func connectToDB() {
	dsn := fmt.Sprintf("host=%s port=%d user=%s password=%s dbname=%s sslmode=disable",
		options.PostgresHost,
		options.PostgresPort,
		options.PostgresUser,
		options.PostgresPassword,
		options.PostgresDatabase,
	)

	var err error
	db, err = gorm.Open(postgres.Open(dsn), &gorm.Config{})
	if err != nil {
		panic(err)
	}

	db.AutoMigrate(&Rollout{})
	db.Create(&Rollout{Status: 0})
}

var db *gorm.DB

var options Config

var validate = validator.New()

func main() {
	loadConfig()
	connectToDB()

	app := fiber.New(fiber.Config{
		JSONEncoder: json.Marshal,
		JSONDecoder: json.Unmarshal,
	})
	app.Use(logger.New())
	app.Use(favicon.New())

	app.Get("/ping", func(c *fiber.Ctx) error {
		return c.SendString("pong! 🏓")
	})

	app.Post("/rollout", func(c *fiber.Ctx) error {
		// get rollout status from db
		var rollout Rollout
		db.First(&rollout)
		// update db with rollout status
		go func() {
			for i := 1; i <= 100; i++ {
				rollout.Status = i
				db.Save(&rollout)
				time.Sleep(time.Second)
			}
		}()
		return c.Status(204).SendString("Rollout")
	})

	app.Get("/status", func(c *fiber.Ctx) error {
		var rollout Rollout
		db.First(&rollout)
		return c.JSON(fiber.Map{"status": rollout.Status})
	})

	app.Post("/random", func(c *fiber.Ctx) error {
		blue := rand.Intn(50) + 50
		green := 100 - blue
		return c.JSON(fiber.Map{"blue": blue, "green": green})
	})

	app.Listen(":3000")
}
