package org.example.elearningkeycloak.repository;

import org.example.elearningkeycloak.entity.Cour;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CourRepository extends JpaRepository<Cour,Long> {
}
