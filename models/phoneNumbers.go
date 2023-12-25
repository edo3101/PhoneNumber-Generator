package models

type Phone struct {
	ID          uint
	PhoneNumber string `json:"PhoneNumber"`
	Provider    string `json:"Provider"`
}
