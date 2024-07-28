package com.example.doacao_animais.controller;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping("/views")
public class ViewsController {

	@GetMapping("/cadastrar_animal")
	public String cadastrar_animal() {
		return "cadastrar_animal";
	}
        
        @GetMapping("/editar_animal/{id}")
	public String editar_animal(@PathVariable("id") long id) {
		return "editar_animal";
	}
        
        @GetMapping("/animais")
	public String listar_animais() {
		return "animais";
	}

}