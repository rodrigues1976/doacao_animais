/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.example.doacao_animais.controller;

import com.example.doacao_animais.model.Animal;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import com.example.doacao_animais.repository.AnimalRepository;

@RestController
@RequestMapping("/animais")
public class AnimalController {

	@Autowired
	AnimalRepository animalRepository;

	@PostMapping()
	public ResponseEntity<Animal> createAnimal(@RequestBody Animal animal) {
		try {
                    Animal _animal = animalRepository.save(animal);                          
                    return new ResponseEntity<>(_animal, HttpStatus.CREATED);
		} catch (Exception e) {
			return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}
        
        @GetMapping()
        public ResponseEntity<List<Animal>> getAllAnimais() {
            try {
                List<Animal> animais = new ArrayList<>();
                animalRepository.findAll().forEach(animais::add);

                if (animais.isEmpty()) {
                    return new ResponseEntity<>(HttpStatus.NO_CONTENT);
                }

                return new ResponseEntity<>(animais, HttpStatus.OK);
            } catch (Exception e) {
                return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
            }
        }
        
        @GetMapping("{id}")
        public ResponseEntity<Animal> getAnimal(@PathVariable("id") long id) {

            Optional<Animal> animal = animalRepository.findById(id);

            if (animal.isPresent()) {
                return new ResponseEntity<>(animal.get(), HttpStatus.OK);
            } else {
                return new ResponseEntity<>(HttpStatus.NOT_FOUND);
            }
        }
        
        @PutMapping("{id}")
        public ResponseEntity<Animal> updateAnimal(@PathVariable("id") long id, @RequestBody Animal animal) {
            Optional<Animal> animalData = animalRepository.findById(id);

            if (animalData.isPresent()) {
                Animal _animal = animalData.get();
                _animal.setEspecie(animal.getEspecie());
                _animal.setDescricao(animal.getDescricao());
                _animal.setInfoContato(animal.getContato());
                return new ResponseEntity<>(animalRepository.save(_animal), HttpStatus.OK);
            } else {
                return new ResponseEntity<>(HttpStatus.NOT_FOUND);
            }
        }
        
        @DeleteMapping("{id}")
        public ResponseEntity<HttpStatus> deleteAnimal(@PathVariable("id") long id) {
            try {
                animalRepository.deleteById(id);
                return new ResponseEntity<>(HttpStatus.NO_CONTENT);
            } catch (Exception e) {
                return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
            }
        }

}
