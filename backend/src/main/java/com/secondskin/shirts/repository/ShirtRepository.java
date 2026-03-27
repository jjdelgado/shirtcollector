package com.secondskin.shirts.repository;

import java.util.List;
import java.util.UUID;

import org.springframework.data.jpa.domain.Specification;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

import com.secondskin.shirts.domain.Shirt;

public interface ShirtRepository extends JpaRepository<Shirt, UUID>, JpaSpecificationExecutor<Shirt> {

    @Override
    @EntityGraph(attributePaths = "team")
    List<Shirt> findAll(Specification<Shirt> spec);
}
