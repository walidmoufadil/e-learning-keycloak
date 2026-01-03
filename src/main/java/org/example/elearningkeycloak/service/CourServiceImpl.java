package org.example.elearningkeycloak.service;

import jakarta.transaction.Transactional;
import org.example.elearningkeycloak.entity.Cour;
import org.example.elearningkeycloak.repository.CourRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CourServiceImpl implements CourService{
    private final CourRepository courRepository;
    public CourServiceImpl(CourRepository courRepository) {
        this.courRepository = courRepository;
    }

    @Override
    public void createCour(Cour cour) {
        courRepository.save(cour);
    }

    @Override
    public Cour getCourById(Long id) {
        return courRepository.findById(id).orElseThrow(()-> new RuntimeException("Cour not found"));
    }

    @Override
    public List<Cour> getAllCours() {
        return courRepository.findAll();
    }

    @Override
    @Transactional
    public void updateCour(Long id, Cour cour) {
        Cour existingCour = courRepository.findById(id).orElseThrow(()-> new RuntimeException("Cour not found"));
        existingCour.setTitle(cour.getTitle());
        existingCour.setDescription(cour.getDescription());
    }

    @Override
    public void deleteCour(Long id) {
        courRepository.deleteById(id);
    }
}
