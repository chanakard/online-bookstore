package com.chanakard.onlinebookstore.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.chanakard.onlinebookstore.entity.Book;

public interface BookRepository extends JpaRepository<Book, Long> {

}
