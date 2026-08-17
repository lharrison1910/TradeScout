package tradescout.api.tradescout.config;

import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;
import tradescout.api.tradescout.enums.InvoiceStatusEnum;
import tradescout.api.tradescout.models.Business;
import tradescout.api.tradescout.models.Invoice;
import tradescout.api.tradescout.models.User;
import tradescout.api.tradescout.repository.BusinessRepository;
import tradescout.api.tradescout.repository.InvoiceRepository;
import tradescout.api.tradescout.repository.UserRepository;

import java.math.BigDecimal;
import java.math.RoundingMode;
import java.time.Instant;
import java.util.ArrayList;
import java.util.List;

@Component
public class DataSeeder implements CommandLineRunner {

    private final UserRepository userRepository;
    private final BusinessRepository businessRepository;
    private final InvoiceRepository invoiceRepository;
    private final PasswordEncoder passwordEncoder;

    public DataSeeder(UserRepository userRepository,
                      BusinessRepository businessRepository,
                      InvoiceRepository invoiceRepository,
                      PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.businessRepository = businessRepository;
        this.invoiceRepository = invoiceRepository;
        this.passwordEncoder = passwordEncoder;
    }

    @Override
    @Transactional
    public void run(String... args) throws Exception {
        if (userRepository.count() > 0) {
            return;
        }

        System.out.println("🌱 Seeding database with users, businesses, and 50 invoices...");

        String defaultPassword = passwordEncoder.encode("Password123!");

        User admin = createUser("admin@tradescout.co.uk", defaultPassword);

        List<User> users = new ArrayList<>();
        users.add(createUser("dave.builder@tradescout.co.uk", defaultPassword));
        users.add(createUser("sarah.spark@tradescout.co.uk", defaultPassword));
        users.add(createUser("mike.plumber@tradescout.co.uk", defaultPassword));
        users.add(createUser("john.carpenter@tradescout.co.uk", defaultPassword));
        users.add(createUser("emma.decorator@tradescout.co.uk", defaultPassword));

        String[] businessNames = {
            "Apex Building Contractors Ltd",
            "Bright Spark Electrical",
            "Flow Plumbing & Heating",
            "Timbercraft Joinery",
            "Fresh Coat Decorating",
            "Solid Foundation Brickwork",
            "City Wire Solutions",
            "Pipeline Emergency Plumbers",
            "Precision Roofing UK",
            "Elite Tiling & Renovations"
        };

        List<Business> businesses = new ArrayList<>();
        for (int i = 0; i < businessNames.length; i++) {
            Business business = new Business();
            business.setBusinessName(businessNames[i]);
            business.setVatNumber("GB" + (100000000 + (i * 12345)));
            business.setOwner(users.get(i % users.size()));
            businesses.add(businessRepository.save(business));
        }

        String[] customerNames = {
            "Acme Commercial Ltd", "Oakridge Housing", "St. Jude Hospital",
            "Smith Residence", "Taylor Retail Park", "Greenway Estate",
            "Highland Developments", "Apex Storage Co", "Baker Street Cafe", "Westside Garage"
        };

        InvoiceStatusEnum[] statuses = InvoiceStatusEnum.values();

        for (int i = 1; i <= 50; i++) {
            Business business = businesses.get((i - 1) % businesses.size());
            InvoiceStatusEnum status = statuses[(i - 1) % statuses.length];

            BigDecimal baseAmount = BigDecimal.valueOf(150 + (i * 35.50)).setScale(2, RoundingMode.HALF_UP);
            BigDecimal vatAmount = baseAmount.multiply(new BigDecimal("0.20")).setScale(2, RoundingMode.HALF_UP);
            BigDecimal totalAmount = baseAmount.add(vatAmount);

            Invoice invoice = new Invoice();
            invoice.setBusiness(business);
            invoice.setInvoiceNumber(String.format("INV-%04d", i));
            invoice.setCustomerName(customerNames[(i - 1) % customerNames.length]);
            invoice.setTotalAmount(totalAmount);
            invoice.setTotalVatAmount(vatAmount);
            invoice.setStatus(status);

            if (status != InvoiceStatusEnum.DRAFT) {
                invoice.setIssuedAt(Instant.now().minusSeconds(86400L * (51 - i)));
            }

            invoiceRepository.save(invoice);
        }

        System.out.println("✅ Seeding finished! Created:");
        System.out.println("   - 1 Admin user + 5 Trade users (All passwords: Password123!)");
        System.out.println("   - 10 Businesses");
        System.out.println("   - 50 Invoices (Drafts, Issued, and Paid)");
    }

    private User createUser(String email, String encodedPassword) {
        User user = new User();
        user.setEmail(email);
        user.setPassword(encodedPassword);
        return userRepository.save(user);
    }
}