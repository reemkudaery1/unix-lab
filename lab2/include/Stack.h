#ifndef STACK_H
#define STACK_H

#include <vector>
#include <stdexcept>

template <typename T>
class Stack {
private:
    std::vector<T> data;
public:
    void push(const T& value) {
        data.push_back(value);
    }
    
    void pop() {
        if (data.empty())
            throw std::out_of_range("Stack<>::pop(): empty stack");
        data.pop_back();
    }
    
    T& top() {
        if (data.empty())
            throw std::out_of_range("Stack<>::top(): empty stack");
        return data.back();
    }
    
    const T& top() const {
        if (data.empty())
            throw std::out_of_range("Stack<>::top(): empty stack");
        return data.back();
    }
    
    bool empty() const {
        return data.empty();
    }
    
    size_t size() const {
        return data.size();
    }
};

#endif