package com.example.server.controller;

import java.net.URI;
import java.util.List;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import com.example.server.model.CompletedCustomerRequest;
import com.example.server.payload.ApiResponse;
import com.example.server.payload.CompletedCustomerRequestRequest;
import com.example.server.repository.CompletedCustomerRequestRepository;
import com.example.server.service.CompletedCustomerRequestService;
import com.example.server.service.CustomerRequestService;

@RestController
@RequestMapping("/api/completedCustomerRequests")
public class CompletedCustomerRequestController {
    
    @Autowired
    private CompletedCustomerRequestRepository completedCustomerRequestRepository;

    @Autowired
    private CompletedCustomerRequestService completedCustomerRequestService;

    @Autowired
    private CustomerRequestService customerRequestService;
    
    @PostMapping
    public ResponseEntity<?> createCompletedCustomerRequest(@Valid @RequestBody CompletedCustomerRequestRequest completedCustomerRequestRequest) {
        CompletedCustomerRequest completedCustomerRequest = completedCustomerRequestService.createCompletedCustomerRequest(completedCustomerRequestRequest);
        
        customerRequestService.updateCustomerRequestAnsweredProperty(completedCustomerRequest.getId());

        URI location = ServletUriComponentsBuilder
                .fromCurrentRequest().path("/{counselorId}")
                .buildAndExpand(completedCustomerRequest.getCounselorId()).toUri();
        
                return ResponseEntity.created(location)
                .body(new ApiResponse(true, "문의가 성공적으로 답변 되었습니다."));
    }

    @GetMapping("/byCounselor")
    public ApiResponse getAllCompletedCustomerRequestByCounselorId(@RequestParam(value = "counselorId") Long counselorId) {
        List<CompletedCustomerRequest> allCompletedRequestList = completedCustomerRequestService.getAllRequestsByCounselorId(counselorId);

        if(allCompletedRequestList.isEmpty()) {
            return new ApiResponse(false, "조회 가능한 목록이 없습니다.", allCompletedRequestList);
        } else {
            return new ApiResponse(true, "문의가 성공적으로 조회 되었습니다.", allCompletedRequestList);
        }
    }

    @GetMapping("/byCustomer")
    public ApiResponse getAllCompletedCustomerRequestByCustomerId(@RequestParam(value = "customerId") String customerId) {
        List<CompletedCustomerRequest> allCompletedRequestList = completedCustomerRequestService.getAllRequestsByCustomerId(customerId);

        if(allCompletedRequestList.isEmpty()) {
            return new ApiResponse(false, "조회 가능한 목록이 없습니다.", allCompletedRequestList);
        } else {
            return new ApiResponse(true, "문의가 성공적으로 조회 되었습니다.", allCompletedRequestList);
        }
    }
}
