package com.example.server.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.server.model.CompletedCustomerRequest;

public interface CompletedCustomerRequestRepository extends JpaRepository<CompletedCustomerRequest, Long> {
    
    List<CompletedCustomerRequest> findByCustomerId(String customerId);
    List<CompletedCustomerRequest> findByCounselorId(Long counselorId);
}
