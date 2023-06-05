package learn.field_agent.domain;

import learn.field_agent.data.SecurityClearanceRepository;
import learn.field_agent.models.SecurityClearance;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.when;

@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.NONE)
class SecurityClearanceServiceTest {

    @MockBean
    SecurityClearanceRepository repository;

    @Autowired
    SecurityClearanceService service;


    @Test
    void shouldNotAddDuplicate() {
        SecurityClearance securityClearance = makeSecurityClearance();

        when(repository.findByName(securityClearance.getName())).thenReturn(securityClearance);

        Result<SecurityClearance> actual = service.add(securityClearance);

        assertNull(actual.getPayload());
        assertEquals(ResultType.INVALID, actual.getType());
    }

    @Test
    void shouldAdd() {
        SecurityClearance securityClearance = makeSecurityClearance();
        SecurityClearance mockOut = makeSecurityClearance();
        mockOut.setSecurityClearanceId(3);

        when(repository.add(securityClearance)).thenReturn(mockOut);

        Result<SecurityClearance> actual = service.add(securityClearance);
        assertEquals(ResultType.SUCCESS, actual.getType());
        assertEquals(mockOut, actual.getPayload());
    }

    @Test
    void shouldNotUpdateMissing() {
        SecurityClearance securityClearance = makeSecurityClearance();
        securityClearance.setSecurityClearanceId(99);

        Result<SecurityClearance> actual = service.update(securityClearance);

        assertEquals(ResultType.NOT_FOUND, actual.getType());
    }

    @Test
    void shouldUpdate() {
        SecurityClearance securityClearance = makeSecurityClearance();
        securityClearance.setSecurityClearanceId(1);

        when(repository.update(securityClearance)).thenReturn(true);

        Result<SecurityClearance> actual = service.update(securityClearance);

        assertEquals(ResultType.SUCCESS, actual.getType());
    }

    @Test
    void shouldDeleteById() {
        assertFalse(service.deleteById(3));

        when(repository.deleteById(3)).thenReturn(true);
        assertTrue(service.deleteById(3));
    }


    private SecurityClearance makeSecurityClearance() {
        SecurityClearance securityClearance = new SecurityClearance();
        securityClearance.setName("Top Secret");
        return securityClearance;
    }
}
