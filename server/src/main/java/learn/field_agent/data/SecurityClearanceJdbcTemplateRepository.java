package learn.field_agent.data;

import learn.field_agent.data.mappers.SecurityClearanceMapper;
import learn.field_agent.models.SecurityClearance;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.support.GeneratedKeyHolder;
import org.springframework.jdbc.support.KeyHolder;
import org.springframework.stereotype.Repository;

import java.sql.PreparedStatement;
import java.sql.Statement;
import java.util.List;

@Repository
public class SecurityClearanceJdbcTemplateRepository implements SecurityClearanceRepository {

    private final JdbcTemplate jdbcTemplate;

    public SecurityClearanceJdbcTemplateRepository(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    @Override
    public SecurityClearance findById(int securityClearanceId) {

        final String sql = "select security_clearance_id, name security_clearance_name "
                + "from security_clearance "
                + "where security_clearance_id = ?;";

        return jdbcTemplate.query(sql, new SecurityClearanceMapper(), securityClearanceId)
                .stream()
                .findFirst().orElse(null);
    }

    @Override
    public SecurityClearance findByName(String name) {

        final String sql = "select security_clearance_id, name as security_clearance_name "
                + "from security_clearance "
                + "where name = ?;";

        return jdbcTemplate.query(sql, new SecurityClearanceMapper(), name)
                .stream()
                .findFirst().orElse(null);
    }


    @Override
    public List<SecurityClearance> findAll() {
        final String sql = "select security_clearance_id, name as security_clearance_name "
                + "from security_clearance;";

        return jdbcTemplate.query(sql, new SecurityClearanceMapper());
    }

    @Override
    public SecurityClearance add(SecurityClearance securityClearance) {
        final String sql = "insert into security_clearance (name) values (?);";

        KeyHolder keyHolder = new GeneratedKeyHolder();
        jdbcTemplate.update(connection -> {
            PreparedStatement ps = connection.prepareStatement(sql, Statement.RETURN_GENERATED_KEYS);
            ps.setString(1, securityClearance.getName());
            return ps;
        }, keyHolder);

        securityClearance.setSecurityClearanceId(keyHolder.getKey().intValue());
        return securityClearance;
    }

    @Override
    public boolean update(SecurityClearance securityClearance) {
        final String sql = "update security_clearance set "
                + "name = ? "
                + "where security_clearance_id = ?;";

        return jdbcTemplate.update(sql,
                securityClearance.getName(),
                securityClearance.getSecurityClearanceId()) > 0;
    }

    @Override
    public boolean deleteById(int securityClearanceId) {
        final String sql = "delete from security_clearance where security_clearance_id = ?;";
        return jdbcTemplate.update(sql, securityClearanceId) > 0;
    }

    public boolean isSecurityClearanceInUse(int securityClearanceId) {
        final String sql = "select count(*) "
                + "from agency_agent " // replace with your actual table name
                + "where security_clearance_id = ?;";

        int count = jdbcTemplate.queryForObject(sql, Integer.class, securityClearanceId);

        return count > 0;
    }

}
