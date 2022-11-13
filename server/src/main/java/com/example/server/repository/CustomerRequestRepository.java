package com.example.server.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.server.model.CustomerRequest;

public interface CustomerRequestRepository extends JpaRepository<CustomerRequest, Long>{
    Optional<CustomerRequest> findById(Long requestId);

    List<CustomerRequest> findByCustomerId(String customerId);

    void deleteById(Long requestId);
}
