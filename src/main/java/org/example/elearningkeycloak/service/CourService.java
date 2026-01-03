package org.example.elearningkeycloak.service;

import org.example.elearningkeycloak.entity.Cour;

import java.util.List;

public interface CourService {
    void createCour(Cour cour);
    Cour getCourById(Long id);
    List<Cour> getAllCours();
    void updateCour(Long id, Cour cour);
    void deleteCour(Long id);
}
