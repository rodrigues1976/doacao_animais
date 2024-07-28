package com.example.doacao_animais.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;


@Entity
@Table(name="ANIMAL")
public class Animal {
    @Id
    @GeneratedValue(strategy=GenerationType.AUTO)
    private Long id;
    
    @Column(name="ESPECIE", length=100, nullable=false, unique=false)
    private String especie;
    
    @Column(name="DESCRICAO", length=500, nullable=false, unique=false)
    private String descricao;
    
    @Column(name="CONTATO", length=100, nullable=false, unique=false)
    private String contato;

    
    public long getId(){
        return this.id;
    }
    
    public String getEspecie(){
        return this.especie;
    }
    
    public void setEspecie(String especie){
        this.especie = especie;
    }
    
    public String getDescricao(){
        return this.descricao;
    }
    
    public void setDescricao(String descricao){
        this.descricao = descricao;
    }
    
    public String getContato(){
        return this.contato;
    }
    
    public void setInfoContato(String contato){
        this.contato = contato;
    }
    
}
