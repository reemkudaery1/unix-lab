#ifndef BOOK_H
#define BOOK_H

#include <string>
#include <iostream>

class Book {
private:
    int id;
    std::string title;
    std::string author;
    double price;
public:
    Book(int i, const std::string& t, const std::string& a, double p)
        : id(i), title(t), author(a), price(p) {}

    int getId() const { return id; }
    std::string getTitle() const { return title; }
    std::string getAuthor() const { return author; }
    double getPrice() const { return price; }

    friend std::ostream& operator<<(std::ostream& os, const Book& b) {
        os << "ID: " << b.id << " | " << b.title << " | " << b.author << " | $" << b.price;
        return os;
    }
};

#endif