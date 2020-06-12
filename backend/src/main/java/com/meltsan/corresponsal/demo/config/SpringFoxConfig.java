package com.meltsan.corresponsal.demo.config;

import com.meltsan.corresponsal.demo.config.handler.ErrorDetails;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.PropertySource;
import org.springframework.web.bind.annotation.RequestMethod;
import springfox.documentation.builders.PathSelectors;
import springfox.documentation.builders.RequestHandlerSelectors;
import springfox.documentation.builders.ResponseMessageBuilder;
import springfox.documentation.schema.ModelRef;
import springfox.documentation.service.ApiInfo;
import springfox.documentation.service.Contact;
import springfox.documentation.service.ResponseMessage;
import springfox.documentation.spi.DocumentationType;
import springfox.documentation.spring.web.plugins.Docket;
import springfox.documentation.swagger2.annotations.EnableSwagger2;
import com.fasterxml.classmate.TypeResolver;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

@Configuration
@EnableSwagger2
@PropertySource("classpath:swagger.properties")
public class SpringFoxConfig {

    public static final String URL = "http://www.meltsan.us/";

    @Bean
    public Docket apiDocket() {
        TypeResolver typeResolver = new TypeResolver();
        return new Docket(DocumentationType.SWAGGER_2)
                .select()
                .apis(RequestHandlerSelectors.basePackage("com.meltsan.corresponsal.demo"))
                .paths(PathSelectors.ant("/api/v1/**"))
                .build()
                .groupName("v1")
                .apiInfo(getApiInfo("1"))
                .useDefaultResponseMessages(false)
                .globalResponseMessage(RequestMethod.GET, getCustomizedResponseMessages())
                .globalResponseMessage(RequestMethod.POST, postCustomizedResponseMessages())
                .globalResponseMessage(RequestMethod.PUT, getCustomizedResponseMessages())
                .globalResponseMessage(RequestMethod.DELETE, deleteCustomizedResponseMessages())
                .globalResponseMessage(RequestMethod.PATCH, getCustomizedResponseMessages())
                .additionalModels(typeResolver.resolve(ErrorDetails.class));
    }

    private ApiInfo getApiInfo(String version) {
        return new ApiInfo(
                "API - Employees",
                "API Employees Demo",
                "v".concat(version),
                URL,
                new Contact("Meltsan Solutions", URL, "luis.salgado@meltsan.com"),
                "Licencia",
                URL,
                Collections.emptyList()
        );
    }

    private List<ResponseMessage> getCustomizedResponseMessages() {
        return genericResponseMessages();
    }

    private List<ResponseMessage> postCustomizedResponseMessages() {
        List<ResponseMessage> responseMessages = genericResponseMessages();
        responseMessages.add(new ResponseMessageBuilder().code(201).message("Created!").build());
        return responseMessages;
    }

    private List<ResponseMessage> genericResponseMessages() {
        List<ResponseMessage> responseMessages = new ArrayList<>();
        responseMessages.add(new ResponseMessageBuilder().code(200).message("Ok").build());
        responseMessages.addAll(customizedResponseMessages());
        return responseMessages;
    }

    private List<ResponseMessage> deleteCustomizedResponseMessages() {
        List<ResponseMessage> responseMessages = new ArrayList<>();
        responseMessages.add(new ResponseMessageBuilder().code(204).message("No Content").build());
        responseMessages.addAll(customizedResponseMessages());
        return responseMessages;
    }

    private List<ResponseMessage> customizedResponseMessages() {
        List<ResponseMessage> responseMessages = new ArrayList<>();
        responseMessages.add(
                new ResponseMessageBuilder()
                        .code(400)
                        .message("Input Request is invalid or incorrect")
                        .responseModel(
                                new ModelRef("ErrorDetails")
                        )
                        .build()
        );
        responseMessages.add(
                new ResponseMessageBuilder()
                        .code(401)
                        .message("Invalid oAuth2 Key or Token")
                        .responseModel(
                                new ModelRef("ErrorDetails")
                        )
                        .build()
        );
        responseMessages.add(
                new ResponseMessageBuilder()
                        .code(403)
                        .message("Forbidden")
                        .responseModel(
                                new ModelRef("ErrorDetails")
                        )
                        .build()
        );
        responseMessages.add(
                new ResponseMessageBuilder()
                        .code(404)
                        .message("Not Found. Resource does not exist")
                        .responseModel(
                                new ModelRef("ErrorDetails")
                        )
                        .build()
        );
        responseMessages.add(
                new ResponseMessageBuilder()
                        .code(409)
                        .message("Conflict in the request")
                        .responseModel(
                                new ModelRef("ErrorDetails")
                        )
                        .build()
        );
        responseMessages.add(
                new ResponseMessageBuilder()
                        .code(500)
                        .message("Internal server error, Time out")
                        .responseModel(
                                new ModelRef("ErrorDetails")
                        )
                        .build()
        );
        return responseMessages;
    }

}
