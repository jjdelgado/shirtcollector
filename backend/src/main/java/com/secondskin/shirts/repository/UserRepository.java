package com.secondskin.shirts.repository;

import java.util.Optional;
import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;

import com.secondskin.shirts.domain.User;

public interface UserRepository extends JpaRepository<User, UUID> {
    Optional<User> findByHandle(String handle);
}
