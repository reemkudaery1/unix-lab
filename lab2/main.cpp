#include <iostream>
#include <memory>
#include <vector>
#include <map>
#include <algorithm>
#include <numeric>
#include <stdexcept>
#include "include/Shape.h"
#include "include/Book.h"
#include "include/Stack.h"

int main() {
    // Shapes
    std::vector<std::unique_ptr<Shape>> shapes;
    shapes.push_back(std::unique_ptr<Shape>(new Circle(5.0)));
    shapes.push_back(std::unique_ptr<Shape>(new Rectangle(4.0, 6.0)));
    
    std::cout << "--- Shapes ---" << std::endl;
    for (size_t i = 0; i < shapes.size(); ++i)
        shapes[i]->display();
    
    // Books
    std::map<int, std::shared_ptr<Book>> library;
    library[1] = std::shared_ptr<Book>(new Book(1, "C++ Programming", "Bjarne", 49.99));
    library[2] = std::shared_ptr<Book>(new Book(2, "Clean Code", "Robert", 39.99));
    library[3] = std::shared_ptr<Book>(new Book(3, "Design Patterns", "Gamma", 59.99));
    
    std::cout << "\n--- Library ---" << std::endl;
    for (auto it = library.begin(); it != library.end(); ++it)
        std::cout << *(it->second) << std::endl;
    
    // Stack
    Stack<int> intStack;
    intStack.push(10);
    intStack.push(20);
    std::cout << "\n--- Stack Top ---\n" << intStack.top() << std::endl;
    intStack.pop();
    std::cout << "After pop, top: " << intStack.top() << std::endl;
    
    // STL Algorithms
    std::vector<std::shared_ptr<Book>> bookVec;
    for (auto& pair : library)
        bookVec.push_back(pair.second);
    
    std::sort(bookVec.begin(), bookVec.end(),
        [](auto& a, auto& b) { return a->getPrice() < b->getPrice(); });
    
    std::cout << "\n--- Books sorted by price ---" << std::endl;
    for (auto& b : bookVec)
        std::cout << *b << std::endl;
    
    double total = std::accumulate(bookVec.begin(), bookVec.end(), 0.0,
        [](double sum, auto& b) { return sum + b->getPrice(); });
    std::cout << "\nTotal price: $" << total << std::endl;
    
    int expensive = std::count_if(bookVec.begin(), bookVec.end(),
        [](auto& b) { return b->getPrice() > 40.0; });
    std::cout << "Books > $40: " << expensive << std::endl;
    
    // Exception
    int searchId;
    std::cout << "\nEnter book ID to search: ";
    std::cin >> searchId;
    try {
        if (library.find(searchId) == library.end())
            throw std::runtime_error("Book ID not found!");
        std::cout << "Found: " << *(library[searchId]) << std::endl;
    } catch (const std::exception& e) {
        std::cout << "Error: " << e.what() << std::endl;
    }
    
    return 0;
}