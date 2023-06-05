package learn.field_agent.domain;

import learn.field_agent.data.SecurityClearanceRepository;
import learn.field_agent.models.SecurityClearance;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class SecurityClearanceService {

    private final SecurityClearanceRepository repository;

    public SecurityClearanceService(SecurityClearanceRepository repository) {
        this.repository = repository;
    }

    public List<SecurityClearance> findAll() {
        return repository.findAll();
    }

    public SecurityClearance findById(int securityClearanceId) {
        return repository.findById(securityClearanceId);
    }

    public Result<SecurityClearance> add(SecurityClearance securityClearance) {
        Result<SecurityClearance> result = validate(securityClearance);
        if (!result.isSuccess()) {
            return result;
        }

        SecurityClearance existing = repository.findByName(securityClearance.getName());
        if (existing != null) {
            result.addMessage("Security Clearance with the same name already exists", ResultType.INVALID);
            return result;
        }

        if (repository.add(securityClearance) == null) {
            result.addMessage("Failed to add Security Clearance", ResultType.INVALID);
            return result;
        }

        result.setPayload(repository.add(securityClearance));
        return result;
    }



    public Result<SecurityClearance> update(SecurityClearance securityClearance) {
        Result<SecurityClearance> result = validate(securityClearance);
        if (!result.isSuccess()) {
            return result;
        }
        if (!repository.update(securityClearance)) {
            result.addMessage("Failed to update Security Clearance", ResultType.NOT_FOUND);
        }
        result.setPayload(securityClearance);
        return result;
    }

    public boolean deleteById(int securityClearanceId) {
        return repository.deleteById(securityClearanceId);
    }

    private Result<SecurityClearance> validate(SecurityClearance securityClearance) {
        Result<SecurityClearance> result = new Result<>();

        if (securityClearance == null) {
            result.addMessage("Security Clearance cannot be null", ResultType.INVALID);
            return result;
        }

        if (Validations.isNullOrBlank(securityClearance.getName())) {
            result.addMessage("Name is required", ResultType.INVALID);
        }

        return result;
    }

}
