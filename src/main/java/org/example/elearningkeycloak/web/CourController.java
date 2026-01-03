package org.example.elearningkeycloak.web;

import org.example.elearningkeycloak.entity.Cour;
import org.example.elearningkeycloak.service.CourService;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api")
public class CourController {
    private CourService courService;

    public CourController(CourService courService) {
        this.courService = courService;
    }

    @GetMapping("/cours")
    @PreAuthorize("hasAuthority('USER')")
    public List<Cour> getCours(){
        return  courService.getAllCours();
    }

    @PostMapping("/cour")
    @PreAuthorize("hasAuthority('ADMIN')")
    public void createCour(Cour cour){
        courService.createCour(cour);
    }

    @GetMapping("authentication")
    public Authentication  authenticate(Authentication authentication){
        return authentication;
    }
}
