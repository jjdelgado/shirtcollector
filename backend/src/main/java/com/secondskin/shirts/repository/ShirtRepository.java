package com.secondskin.shirts.repository;

import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;

import com.secondskin.shirts.domain.Shirt;

public interface ShirtRepository extends JpaRepository<Shirt, UUID> {}
