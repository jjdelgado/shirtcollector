package com.secondskin.shirts.repository;

import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;

import com.secondskin.shirts.domain.UserShirt;

public interface UserShirtRepository extends JpaRepository<UserShirt, UUID> {
    
}
