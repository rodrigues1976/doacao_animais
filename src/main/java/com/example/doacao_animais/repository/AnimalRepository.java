package com.example.doacao_animais.repository;

import com.example.doacao_animais.model.Animal;

import org.springframework.data.jpa.repository.JpaRepository;

public interface AnimalRepository extends JpaRepository<Animal, Long> {

}