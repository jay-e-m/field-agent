package learn.field_agent.data;

import learn.field_agent.models.SecurityClearance;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.dao.DataIntegrityViolationException;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.NONE)
class SecurityClearanceJdbcTemplateRepositoryTest {

    @Autowired
    SecurityClearanceJdbcTemplateRepository repository;

    @Autowired
    KnownGoodState knownGoodState;

    @BeforeEach
    void setup() {
        knownGoodState.set();
    }

    @Test
    void shouldFindById() {
        SecurityClearance secret = new SecurityClearance(1, "Secret");
        SecurityClearance topSecret = new SecurityClearance(2, "Top Secret");

        SecurityClearance actual = repository.findById(1);
        System.out.println("Expected: " + secret);
        System.out.println("Actual: " + actual);
        assertEquals(secret, actual);

        assertEquals(secret, actual);

        actual = repository.findById(2);
        assertEquals(topSecret, actual);

        actual = repository.findById(3);
        assertEquals(null, actual);
    }

    @Test
    void shouldAdd() {
        SecurityClearance securityClearance = new SecurityClearance();
        securityClearance.setName("Confidential");

        SecurityClearance actual = repository.add(securityClearance);
        assertNotNull(actual);
        assertEquals("Confidential", actual.getName());
    }

    @Test
    void shouldUpdate() {
        SecurityClearance securityClearance = repository.findById(1);
        securityClearance.setName("New name");

        assertTrue(repository.update(securityClearance));

        SecurityClearance updated = repository.findById(1);
        assertEquals("New name", updated.getName());
    }

    @Test
    void shouldDelete() {
        int id = 1;

        if (repository.isSecurityClearanceInUse(id)) {
            assertThrows(DataIntegrityViolationException.class, () -> repository.deleteById(id));
        } else {
            assertTrue(repository.deleteById(id));
            assertNull(repository.findById(id));
        }
    }




}