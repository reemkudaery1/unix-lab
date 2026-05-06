#ifndef SHAPE_H
#define SHAPE_H

#include <iostream>
#include <cmath>

class Shape {
protected:
    std::string name;
public:
    Shape(const std::string& n) : name(n) {}
    virtual double area() const = 0;
    virtual double perimeter() const = 0;
    virtual ~Shape() = default;
    
    void display() const {
        std::cout << name << ": area = " << area() << ", perimeter = " << perimeter() << std::endl;
    }
};

class Circle : public Shape {
    double radius;
public:
    Circle(double r) : Shape("Circle"), radius(r) {}
    double area() const override { return M_PI * radius * radius; }
    double perimeter() const override { return 2 * M_PI * radius; }
};

class Rectangle : public Shape {
    double width, height;
public:
    Rectangle(double w, double h) : Shape("Rectangle"), width(w), height(h) {}
    double area() const override { return width * height; }
    double perimeter() const override { return 2 * (width + height); }
};

#endif